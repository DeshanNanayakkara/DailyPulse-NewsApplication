import {ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import {Colors} from "@/constants/Colors";
import Animated, {FadeIn, FadeInDown, FadeInRight} from "react-native-reanimated";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }}
            style={styles.container}
            imageStyle={{ opacity: 0.7 }}
        >
            <SafeAreaView style={styles.overlayContainer}>
                    <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.logoContainer}>
                        <View style={styles.logoBox}>
                            <Ionicons name="newspaper-outline" size={32} color={Colors.white} />
                            <Text style={styles.logoText}>NewsPulse</Text>
                        </View>
                    </Animated.View>

                <View style={styles.wrapper}>
                    <Animated.View entering={FadeInDown.delay(400).duration(800)}>
                        <Text style={styles.title}>Stay Updated With The World</Text>
                        <View style={styles.divider} />
                        <Text style={styles.description}>
                            Get breaking news and personalized updates directly to your feed. Discover stories that matter to you.
                        </Text>
                    </Animated.View>

                    {/* Features Preview */}
                    <Animated.View style={styles.featuresContainer} entering={FadeInDown.delay(800).duration(800)}>
                        <View style={styles.featureItem}>
                            <Ionicons name="globe-outline" size={24} color={Colors.white} />
                            <Text style={styles.featureText}>Global Coverage</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="notifications-outline" size={24} color={Colors.white} />
                            <Text style={styles.featureText}>Instant Alerts</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="bookmark-outline" size={24} color={Colors.white} />
                            <Text style={styles.featureText}>Save Stories</Text>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(1000).duration(800)}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => router.replace("/(tabs)")}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.btnText}>GET STARTED</Text>
                            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
                            {/*<Text style={styles.secondaryBtnText}>Learn More</Text>*/}
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                    {/*<Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(500)}>Stay Updated!</Animated.Text>*/}
                    {/*<Animated.Text style={styles.description} entering={FadeInRight.delay(700).duration(500)}>*/}
                    {/*    Get breaking news and personalized updates directly to your feed.*/}
                    {/*</Animated.Text>*/}
                    {/*<Animated.View entering={FadeInDown.delay(1200).duration(500)}>*/}
                    {/*    <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>*/}
                    {/*        <Text style={styles.btnText}>Get Started</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</Animated.View>*/}
            </SafeAreaView>
        </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black || '#121212',
    },
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    logoContainer: {
        paddingTop: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    logoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    logoText: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: '700',
        letterSpacing: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50,
        paddingHorizontal: 30,
        gap: 24,
    },
    title: {
        color: Colors.white,
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: 0.5,
        lineHeight: 42,
        textAlign: 'center',
        marginBottom: 12,
    },
    divider: {
        height: 3,
        width: 60,
        backgroundColor: Colors.tint || '#FF6B6B',
        alignSelf: 'center',
        marginBottom: 16,
        borderRadius: 2,
    },
    description: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        lineHeight: 24,
        textAlign: 'center',
        opacity: 0.9,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    featureItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '30%',
    },
    featureText: {
        color: Colors.white,
        fontSize: 12,
        marginTop: 6,
        fontWeight: '600',
    },
    btn: {
        backgroundColor: Colors.tint || '#FF6B6B',
        paddingVertical: 16,
        marginVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        shadowColor: Colors.tint || '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    btnText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
    },
    secondaryBtn: {
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    secondaryBtnText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
