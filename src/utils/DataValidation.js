export const checkValidData = (
  name,
  email,
  password,
  confirmPassword,
  isSignInForm,
) => {
  // Email check (Sign In aur Sign Up dono me)
  if (!email || !email.trim()) return "Email is required";
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim()))
    return "Email is not valid (example: name@gmail.com)";

  // Sign In: sirf password khali nahi hona chahiye
  if (isSignInForm) {
    if (!password) return "Password is required";
    return null;
  }

  // ---- Sign Up checks ----
  if (!name || !name.trim()) return "Name is required";
  if (!/^[a-zA-Z ]+$/.test(name.trim()))
    return "Name can only contain letters and spaces";

  // Password: jo jo missing hai wo sab ek saath batao
  const missing = [];
  if (!password || password.length < 8) missing.push("at least 8 characters");
  if (!/[a-z]/.test(password || "")) missing.push("a lowercase letter");
  if (!/[A-Z]/.test(password || "")) missing.push("an uppercase letter");
  if (!/\d/.test(password || "")) missing.push("a number");
  if (!/[^A-Za-z0-9]/.test(password || ""))
    missing.push("a special character (e.g. @ # $ ! % * ? &)");

  if (missing.length > 0)
    return "Password must contain " + missing.join(", ");

  if (password !== confirmPassword) return "Passwords do not match";

  return null;
};