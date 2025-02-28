import {Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import SearchBar from "@/components/SearchBar";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import newsCategoryList from "@/constants/Categories";
import CheckBox from "@/components/CheckBox";
import {useNewsCategories} from "@/hooks/useNewsCategories";
import {useNewsCountries} from "@/hooks/useNewsCountry";
import {Colors} from "@/constants/Colors";
import {Link, useRouter} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import {FadeInDown} from "react-native-reanimated";

type Props = {};

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const router = useRouter();

  const {newsCategories, toggleNewsCategory} = useNewsCategories();
  const {newsCountries, toggleNewsCountry} = useNewsCountries();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

    const resetFilters = () => {
        setSearchQuery("");
        setCategory("");
        setCountry("");
    };

  return (
      <View style={styles.wrapper}>
          <StatusBar style="dark" />
          <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
              {/* Header */}
              <View style={styles.header}>
                  <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => router.back()}
                  >
                      <Ionicons name="arrow-back" size={24} color="#1F2937" />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>Filter News</Text>
                  <TouchableOpacity
                      style={styles.resetButton}
                      onPress={resetFilters}
                  >
                      <Text style={styles.resetText}>Reset</Text>
                  </TouchableOpacity>
              </View>

              {/* Search */}
              <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                  <Text style={styles.sectionLabel}>Search for news</Text>
                  <SearchBar
                      withHorizontalPadding={false}
                      setSearchQuery={setSearchQuery}
                  />
              </Animated.View>

              {/* Categories */}
              <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                  <View style={styles.sectionHeader}>
                      <Ionicons name="grid-outline" size={20} color={Colors.tint || "#FF6B6B"} />
                      <Text style={styles.title}>Categories</Text>
                  </View>
                  <View style={styles.card}>
                      <View style={styles.listContainer}>
                          {newsCategories.map((item) => (
                              <CheckBox
                                  key={item.id}
                                  label={item.title}
                                  checked={item.selected}
                                  onPress={() => {
                                      toggleNewsCategory(item.id);
                                      setCategory(item.slug);
                                  }}
                              />
                          ))}
                      </View>
                  </View>
              </Animated.View>

              {/* Countries */}
              <Animated.View entering={FadeInDown.delay(300).duration(400)}>
                  <View style={styles.sectionHeader}>
                      <Ionicons name="globe-outline" size={20} color={Colors.tint || "#FF6B6B"} />
                      <Text style={styles.title}>Country</Text>
                  </View>
                  <View style={styles.card}>
                      <View style={styles.listContainer}>
                          {newsCountries.map((item, index) => (
                              <CheckBox
                                  key={index}
                                  label={item.name}
                                  checked={item.selected}
                                  onPress={() => {
                                      toggleNewsCountry(index);
                                      setCountry(item.code);
                                  }}
                              />
                          ))}
                      </View>
                  </View>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                  <Link href={{
                      pathname: `/news/search`,
                      params: { query: searchQuery, category, country }
                  }} asChild>
                      <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
                          <Ionicons name="search-outline" size={20} color={Colors.white} />
                          <Text style={styles.searchBtnText}>Search News</Text>
                      </TouchableOpacity>
                  </Link>

                  <Text style={styles.helperText}>
                      Select multiple filters to narrow down your results
                  </Text>
              </Animated.View>
          </ScrollView>
      </View>
  )
}

export default Page

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        marginBottom: 8,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
    },
    resetButton: {
        padding: 8,
    },
    resetText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.tint || '#FF6B6B',
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 12,
        gap: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    searchBtn: {
        backgroundColor: Colors.tint || '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 24,
        marginBottom: 8,
        flexDirection: 'row',
        gap: 8,
        shadowColor: Colors.tint || '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    searchBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    helperText: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 32,
    }
})
