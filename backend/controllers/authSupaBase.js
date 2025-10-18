import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import supabase from "./../index.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!validator.isMobilePhone(phone)) {
      return res.status(400).json({ message: "Invalid phone number." });
    }

    if (!validator.isStrongPassword(password, { minLength: 6 })) {
      return res
        .status(400)
        .json({ message: "Password must be stronger (min 6 characters)." });
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError.message);
      return res
        .status(500)
        .json({ message: "Database error while checking user." });
    }

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: insertError } = await supabase.from("users").insert([
      {
        name,
        email,
        phone,
        password: hashedPassword,
        userRole: "user",
        userStatus: "active",
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
      return res
        .status(500)
        .json({ message: "Error inserting user into database." });
    }

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Server error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .ilike("email", normalizedEmail) // case-insensitive match
      .maybeSingle();

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError.message);
      return res.status(500).json({ message: "Database error while fetching user." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not defined in environment variables.");
      return res.status(500).json({ message: "Server configuration error." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.userRole,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.userRole,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// async function signUp(email, password) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     console.error("Sign up error:", error.message);
//     return;
//   }

//   console.log("Sign up success:", data);
// }

// async function signIn(email, password) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     console.error("Login error:", error.message);
//     return;
//   }

//   console.log("Login success:", data);
// }
// export { signIn, signUp };
