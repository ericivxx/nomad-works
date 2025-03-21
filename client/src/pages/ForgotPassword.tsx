import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import RequestPasswordResetForm from "@/components/RequestPasswordResetForm";

export default function ForgotPassword() {
  const { isAuthenticated, loading } = useUser();
  const [, navigate] = useLocation();

  // Redirect to profile if authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | NomadWorks</title>
        <meta name="description" content="Reset your password to access your NomadWorks account" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <RequestPasswordResetForm />
        </div>
      </div>
    </>
  );
}