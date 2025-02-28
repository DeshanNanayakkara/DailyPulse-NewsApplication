import {Link, router, Stack, useLocalSearchParams} from "expo-router";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import {useEffect, useState} from "react";
import {NewsDataType} from "@/types";
import {Ionicons} from "@expo/vector-icons";
import Loading from "@/components/Loading";
import {NewsItem} from "@/components/NewsList";

type Props = {}

const Page = (props: Props) => {
    const {query, category, country} = useLocalSearchParams<{
        query: string,
        category: string,
        country: string
    }>();

    const [news, setNews] = useState<NewsDataType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async (category:string = '') => {
        try {
            let  categoryString = '';
            let  countryString = '';
            let  queryString = '';
            if ( category ) {
                categoryString = `&category=${category}`
            }
            if ( country ) {
                countryString = `&country=${country}`
            }
            if ( query ) {
                queryString = `&q=${query}`
            }

            const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=af&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
            const response = await axios.get(url);

            console.log(response.data);
            if (response && response.data) {
                setNews(response.data.results);
                setIsLoading(false);
            }

        }catch (err: any) {
            console.log('Error Message: ', err.message);
        }
    };

    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back' size={22}/>
                    </TouchableOpacity>
                ),
                title: "                      Search",
            }}/>
            <View style={styles.container}>
                {isLoading ? (
                    <Loading size={'large'}/>
                ) : (
                    <FlatList data={news}
                         keyExtractor={(_, index) => `list_item${index}`}
                         showsVerticalScrollIndicator={false}
                         renderItem={({index, item} ) => {
                            return(
                               <Link href={`/news/${item.article_id}`} asChild key={index}>
                                   <TouchableOpacity>
                                      <NewsItem item={item}/>
                                   </TouchableOpacity>
                               </Link>
                            )
                         }}
                    />
                )}
            </View>
        </>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginVertical: 20,
    }
})
