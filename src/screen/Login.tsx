import React, { useContext, useEffect, useState } from "react";
import { Button, ScrollView, Text, StyleSheet, TextInput, Image, View, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LoginContext } from "../context";
import { SCREEN_H, WINDOW_H } from "../utils";

const Detail = ({ navigation }: any) => {
    const { signIn } = useContext(LoginContext)!;
    const [h, setH] = useState(30);
    useEffect(() => {
      const keybord = Keyboard.addListener("keyboardDidShow", (e)=> {
        setH(e.endCoordinates.height+10);
      });
      const keybordClose = Keyboard.addListener("keyboardDidHide", (e)=> {
        setH(30);
      });
      return () => {
        keybord.remove();
        keybordClose.remove();
      }
    }, []);
    
    return (
        <View
            style={styles.wraaper}
            onTouchStart={()=> {
                Keyboard.dismiss();
            }}
        >
            <Image
                style={[styles.logoPic]}
                source={require("../assets/logo.webp")}
            />
            <TextInput style={styles.input} cursorColor="#8694fd" placeholder="账号" />
            <TextInput style={styles.input} secureTextEntry cursorColor="#8694fd" placeholder="密码" />
            <TouchableOpacity activeOpacity={0.7} style={styles.logoBtn} onPress={() => signIn()}>
                <Text style={{color: "#ffffff"}}>登录</Text>
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: "row", alignItems: "flex-end", paddingBottom: h}}>
                <Text>注册</Text><Text style={{paddingHorizontal: 10}}>|</Text><Text>忘记密码</Text><Text style={{paddingHorizontal: 10}}>|</Text><Text>更多</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wraaper: {
        alignItems: "center",
        height: WINDOW_H,
        overflow: "hidden",
        backgroundColor: "#ffffff"
    },
    logoBtn: { 
        alignItems: "center", 
        justifyContent: "center",
        marginTop: 30,
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        backgroundColor: "#747dc3" 
    },
    logoPic: {
        width: 80,
        height: 80,
        marginTop: 20
    },
    input: {
        width: "80%",
        height: 50,
        borderRadius: 50,
        marginTop: 20,
        textAlign: "center",
        backgroundColor: "#eeeeee"
    }
})

export default Detail