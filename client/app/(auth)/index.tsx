import {
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/assets/styles/AuthScreen.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type AuthMode = "login" | "register";

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerifying(true);
    }, 1500);
  };

  const handleVerify = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerifying(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  const svgMarkup = `<svg width="63" height="70" viewBox="0 0 63 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M33.817 52.382c0-15.988 12.96-28.948 28.948-28.948v17.585c0 15.987-12.96 28.948-28.948 28.948zm-4.869 0c0-15.988-12.96-28.948-28.948-28.948v17.585c0 15.987 12.96 28.948 28.948 28.948z" fill="#fff"/>
  <g clip-path="url(#a)">
    <path d="M31.487 0c0 8.764 7.049 15.881 15.786 15.992l.207.001-.207.001c-8.737.11-15.786 7.228-15.786 15.992 0-8.833-7.16-15.993-15.993-15.993 8.833 0 15.993-7.16 15.993-15.993" fill="#fff"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M15.494 0H47.48v31.986H15.494z"/>
    </clipPath>
  </defs>
</svg>`;

  if (verifying) {
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === "ios" ? "padding" : "undefined"}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            {/* logo */}
            <View style={styles.logoRow}>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                style={styles.logoBox}
              >
                <SvgXml xml={svgMarkup} width="50%" height="50%" />
              </LinearGradient>
              <Text style={styles.appName}>InstaChat</Text>
            </View>

            {/* Hero text */}
            <Text style={styles.heading}>Verify Email </Text>

            <Text style={styles.subheading}>
              We have sent 6 digit Verification Code to {email}
            </Text>

            {/* form */}
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Verification Code</Text>
                <TextInput
                  style={styles.input}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  placeholder="Enter 6 Digit Code"
                  placeholderTextColor={Colors.outlineVariant}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>

              {/* Back to sign up link */}
              <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>Did Not receive a Code?</Text>
                <TouchableOpacity onPress={() => setVerifying(false)}>
                  <Text style={styles.toggleLink}>Go Back</Text>
                </TouchableOpacity>
              </View>

              {/* Submit */}
              <TouchableOpacity
                disabled={loading}
                activeOpacity={0.88}
                style={styles.btnWrapper}
                onPress={handleVerify}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryContainer]}
                  style={styles.btn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.onPrimary} />
                  ) : (
                    <>
                      <Text style={styles.btnText}>Verify Code</Text>
                      <Ionicons
                        name="arrow-forward"
                        size={18}
                        color={Colors.onPrimary}
                      />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : "undefined"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* logo */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              style={styles.logoBox}
            >
              <SvgXml xml={svgMarkup} width="50%" height="50%" />
            </LinearGradient>
            <Text style={styles.appName}>InstaChat</Text>
          </View>

          {/* Hero text */}
          <Text style={styles.heading}>
            {mode === "login" ? "Welcome Back 👋" : "Create Account"}
          </Text>

          <Text style={styles.subheading}>
            {mode === "login"
              ? "Sign in to continue charging"
              : "Fill in your detail to get started"}
          </Text>

          {/* form */}
          <View style={styles.form}>
            {mode === "register" && (
              <>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                    placeholderTextColor={Colors.outlineVariant}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Username Handle</Text>
                  <View style={styles.handleRow}>
                    <Text style={styles.atSign}>@</Text>
                    <TextInput
                      style={[styles.input, styles.handleInput]}
                      value={handle}
                      onChangeText={(v) =>
                        setHandle(v.toLowerCase().replace(/\s/g, ""))
                      }
                      placeholder="Username"
                      placeholderTextColor={Colors.outlineVariant}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </>
            )}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@email.com"
                placeholderTextColor={Colors.outlineVariant}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="* * * * * *"
                placeholderTextColor={Colors.outlineVariant}
                secureTextEntry={true}
              />
            </View>
            {/* Toggle Mode */}

            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {mode === "login"
                  ? "Do Not have an Account"
                  : "Already Have an Account?"}
              </Text>
              <TouchableOpacity
                onPress={() => setMode(mode === "login" ? "register" : "login")}
              >
                <Text style={styles.toggleLink}>
                  {mode === "login" ? "Sign Up" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <TouchableOpacity
              disabled={loading}
              activeOpacity={0.88}
              style={styles.btnWrapper}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                style={styles.btn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.onPrimary} />
                ) : (
                  <>
                    <Text style={styles.btnText}>
                      {mode === "login" ? "Sign In" : "Sign Up"}
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={Colors.onPrimary}
                    />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
