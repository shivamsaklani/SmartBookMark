import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";

export async function validateUser(): Promise<User | null> {
    try {
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
                        } catch {
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                        }
                    },
                },
            }
        );

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error) {
            console.error("[Middleware] Supabase getUser error:", error.message);
        }

        return user;
    } catch (error) {
        console.error("Error validating user:", error);
        return null;
    }
}
