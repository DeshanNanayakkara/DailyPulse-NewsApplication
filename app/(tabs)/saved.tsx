import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Link, Stack} from "expo-router";
import Loading from "@/components/Loading";
import {NewsItem} from "@/components/NewsList";
import {useIsFocused} from "@react-navigation/core";

type Props = {}

const Page = (props: Props) => {
  const [bookmarksNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchBookmarks = async () => {
    await AsyncStorage.getItem('bookmarks').then(async (token) => {
      const res = JSON.parse(token);
      if (res){
        console.log('Bookmark res: ', res);
        let query_string = res.join(',');
        console.log('Query String: ', query_string);

        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`);
        const news = response.data.results;
        setBookmarkNews(response.data.results);
        setIsLoading(false);
      }else{
        setBookmarkNews([]);
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    fetchBookmarks();
  }, [isFocused]);

  return (
      <>
        <Stack.Screen options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}/>
        <View style={styles.container}>
          {isLoading ? (
              <Loading size={'large'}/>
          ) : (
              <FlatList data={bookmarksNews}
                   keyExtractor={(_, index) => `list_item${index}`}
                   showsVerticalScrollIndicator={false}
                   renderItem={({index, item} ) => {
                   return(
                       <Link href={`/news/${item.article_id}`} asChild key={index}>
                           <TouchableOpacity>
                               <NewsItem item={item}/>
                           </TouchableOpacity>
                           </Link>
                   );
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
    margin: 20,
  },
})
