import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation, Link } from "wouter";

const formSchema = z.object({
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

interface ResetPasswordFormProps {
  token?: string | null;
}

export default function ResetPasswordForm({ token: propToken }: ResetPasswordFormProps) {
  const { resetPassword } = useUser();
  const [location] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the token from props or extract from URL as fallback
  const urlToken = (() => {
    try {
      const queryString = location.split("?")[1] || "";
      return new URLSearchParams(queryString).get("token");
    } catch (e) {
      console.error("Error parsing token from URL:", e);
      return null;
    }
  })();
  
  // Use propToken if provided, otherwise use urlToken
  const token = propToken !== undefined ? propToken : urlToken;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      setError("Reset token is missing or invalid");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const success = await resetPassword(
        token,
        values.newPassword,
        values.confirmPassword
      );
      
      if (success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setError("Failed to reset password. The token may be expired or invalid.");
      }
    } catch (err) {
      setError("An error occurred while resetting your password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invalid Request</CardTitle>
          <CardDescription>
            The password reset link is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              The reset token is missing. Please request a new password reset link.
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Link href="/forgot-password">
              <Button>Request New Reset Link</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Create a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="space-y-4">
            <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
              <AlertDescription>
                Your password has been reset successfully. You can now log in with your new password.
              </AlertDescription>
            </Alert>
            <div className="text-center pt-4">
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your new password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your new password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
              
              <div className="text-center pt-4">
                <Link href="/login">
                  <Button variant="link">Back to Login</Button>
                </Link>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}