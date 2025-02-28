import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Animated} from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";
import {useEffect, useState} from "react";
import {NewsDataType} from "@/types";
import Loading from "@/components/Loading";
import {Colors} from "@/constants/Colors";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import values from "ajv/lib/vocabularies/jtd/values";
import {string} from "prop-types";
import {FadeInDown} from "react-native-reanimated";

type Props = {}

const NewsDetails = (props: Props) => {

    const {id} = useLocalSearchParams<{id: string}>();
    const [news, setNews] = useState<NewsDataType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [bookmark, setBookmark] = useState<boolean>(false);

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        if (!isLoading){
            renderBookmark(news[0].article_id);
        }
    }, [isLoading]);

    const getNews = async () => {
        try {
            const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
            const response = await axios.get(url);

            // console.log(response.data);
            if (response && response.data) {
                setNews(response.data.results);
                setIsLoading(false);
            }
        }catch (err: any) {
            console.log('Error Message: ', err.message);
        }
    };

    const saveBookmark = async (newsId: string) => {
        setBookmark(true);
        await AsyncStorage.getItem('bookmarks').then((token) => {
            const res = JSON.parse(token);
            if (res !== null) {
                let data = res.find((values: string) => values === newsId);
                if (data == null) {
                    res.push(newsId);
                    AsyncStorage.setItem('bookmarks', JSON.stringify(res));
                    alert('News has been bookmarked');
                }
            } else {
                let bookmarks = [];
                bookmarks.push(newsId);
                AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                alert('News has been bookmarked');
            }
        });
    };

    const removeBookmark = async (newsId: string) => {
        setBookmark(false);
        const bookmark = await AsyncStorage.getItem('bookmarks').then((token) => {
            const res = JSON.parse(token);
            return res.filter((id: string) => id !== newsId);
        })
        await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmark));
        alert('News has been removed from bookmarks');
    }

    const renderBookmark = async (newsId: string) => {
        await AsyncStorage.getItem('bookmarks').then((token) => {
            const res = JSON.parse(token);
            if (res != null) {
                let data = res.find((values: string) => values === newsId);
                return data == null ? setBookmark(false) : setBookmark(true);
            }
        });
    }
    return (
        <>
        <Stack.Screen options={{
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={22} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        bookmark
                            ? removeBookmark(news[0].article_id)
                            : saveBookmark(news[0].article_id)
                    }
                >
                    <Ionicons name={bookmark ? 'heart' :  'heart-outline'}
                              size={22}
                              color={bookmark ? "red" : Colors.black} />
                </TouchableOpacity>
            ),
            title: "",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: Colors.white,
            }
        }}
        />
        {isLoading ? (
            <Loading size={'large'}/>
        ) : (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
            <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                <Text style={styles.title}>{news[0].title}</Text>
                <View style={styles.newsInfoWrapper}>
                    <View style={styles.dateContainer}>
                        <Ionicons name="time-outline" size={14} color={Colors.darkGrey} />
                        <Text style={styles.newsInfo}>
                            {Moment(news[0].pubDate).format('MMMM DD, hh:mm a')}
                        </Text>
                    </View>
                    <View style={styles.sourceContainer}>
                        <Ionicons name="newspaper-outline" size={14} color={Colors.darkGrey} />
                        <Text style={styles.newsInfo}>{news[0].source_name}</Text>
                    </View>
                </View>
            </Animated.View>
        {news[0].image_url && (
            <Animated.View entering={FadeInDown.delay(200).duration(400)}>
        <Image
            source={{uri: news[0].image_url}}
            style={styles.newsImage}
            resizeMode="cover"
        />
        </Animated.View>
    )}
    <Animated.View entering={FadeInDown.delay(300).duration(400)}>
         {news[0].content ? (
               <Text style={styles.newsContent}>{news[0].content}</Text>
         ) : (
               <Text style={styles.newsContent}>{news[0].description}</Text>
         )}
         </Animated.View>

         {news[0].category && (
             <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.categoryContainer}>
                  {Array.isArray(news[0].category) && news[0].category.map((cat, index) => (
                      <View key={index} style={styles.categoryTag}>
                          <Text style={styles.categoryText}>{cat}</Text>
                      </View>
                  ))}
             </Animated.View>
         )}
    </ScrollView>
   )}
   </>
   )
}

export default NewsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    headerButton: {
        padding: 8,
        borderRadius: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.black,
        marginTop: 16,
        marginBottom: 12,
        letterSpacing: 0.6,
        lineHeight: 30,
    },
    newsImage: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    newsInfoWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 8,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sourceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    newsInfo: {
        fontSize: 12,
        color: Colors.darkGrey,
        fontWeight: '500',
    },
    newsContent: {
        fontSize: 16,
        color: '#374151',
        letterSpacing: 0.5,
        lineHeight: 24,
        marginBottom: 24,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 16,
    },
    categoryTag: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    categoryText: {
        fontSize: 12,
        color: Colors.tint || '#FF6B6B',
        fontWeight: '600',
    }
})
