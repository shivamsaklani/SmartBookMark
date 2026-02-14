import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { prisma } from "@/prismaclient";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (err) {
              console.error("[Callback] Error setting cookies:", err);
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[Callback] Exchange code error:", error.message);
    }

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        try {
          const existingProfile = await prisma.profile.findUnique({
            where: { id: user.id },
          });

          if (!existingProfile) {
            const fullName =
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "Unknown";
            const avatarUrl = user.user_metadata?.avatar_url || "";

            await prisma.profile.create({
              data: {
                id: user.id,
                email: user.email,
                fullName,
                avatarUrl,
              },
            });
          }
        } catch (error) {
          console.error("Error creating/checking profile:", error);
        }
      }
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}