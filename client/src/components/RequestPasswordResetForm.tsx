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
import { Link } from "wouter";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestPasswordResetForm() {
  const { requestPasswordReset } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const result = await requestPasswordReset(values.email);
      
      if (result.success) {
        setIsSuccess(true);
        
        // In a real app, the token would be sent via email
        // This is just for demo purposes
        if (result.token) {
          setResetToken(result.token);
        }
        
        form.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="space-y-4">
            <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
              <AlertDescription>
                If an account with this email exists, we've sent a password reset link.
                Please check your email inbox and follow the instructions.
              </AlertDescription>
            </Alert>
            
            {resetToken && (
              <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800 mt-4">
                <p className="font-medium mb-2">Demo Mode: Reset Token</p>
                <p className="text-sm mb-2">
                  In a real application, this token would be sent via email, not displayed here.
                </p>
                <p className="text-sm font-mono bg-yellow-100 p-2 rounded">
                  {resetToken}
                </p>
                <div className="mt-4">
                  <a href={`/reset-password?token=${encodeURIComponent(resetToken)}`}>
                    <Button className="w-full">
                      Continue to Reset Password
                    </Button>
                  </a>
                </div>
              </div>
            )}
            
            <div className="text-center pt-4">
              <Link href="/login">
                <Button variant="outline">Return to Login</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        type="email"
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  "Send Reset Link"
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