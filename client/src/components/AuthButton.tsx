
import { Link } from "wouter";

export default function AuthButton() {
  return (
    <div className="flex items-center gap-4">
      <script
        src="https://auth.util.repl.co/script.js"
        authed="location.reload()"
      />
    </div>
  );
}
