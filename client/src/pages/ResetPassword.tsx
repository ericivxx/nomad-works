import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPassword() {
  const { isAuthenticated, loading } = useUser();
  const [location, navigate] = useLocation();
  
  // Extract token from URL to pass it via props
  const getToken = () => {
    try {
      console.log("Current location:", location);
      const queryString = window.location.search;
      console.log("Window location search:", queryString);
      const token = new URLSearchParams(queryString).get("token");
      console.log("Extracted token from window.location:", token);
      return token;
    } catch (e) {
      console.error("Error parsing token from URL:", e);
      return null;
    }
  };
  
  const token = getToken();

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
        <meta name="description" content="Create a new password for your NomadWorks account" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </>
  );
}