import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text} from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as Google from "expo-google-app-auth";

function Login() {
    const [userGoogle, setUserGoogle] = useState("");
    
    const ANDROID_CLIENT_ID = "991433114488-qsvs6v89b9gtcqft20q2h9tr96jev0s6.apps.googleusercontent.com";
    const IOS_CLIENT_ID = "991433114488-akkcdalau9r7145choskav28llb2iv4h.apps.googleusercontent.com";

    const navigation = useNavigation();

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: ANDROID_CLIENT_ID,
                iosClientId: IOS_CLIENT_ID,
                scopes: ["profile", "email"],
            });
            navigation.navigate("Home");

            if (result.type === "success") {
                setUserGoogle(result.user.name););
                console.log(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    const signInWithGoogle = () => {
        signInWithGoogleAsync();
    };

    return (
        <View>
           <TouchableOpacity onPress={() => signInWithGoogle()}>
              <Text>Masuk dengan Google</Text>
           </TouchableOpacity>        
        </View>
    );
}

export default Login;
