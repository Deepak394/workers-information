import React, { useState } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const workers = require('../data/Workers.json'); // Replace with your actual path
const categories = require('../data/Categorioes.json'); // Replace with your actual path

const CategoriesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (!selectedCategory || worker.category === selectedCategory)
  );

  const handleCategoryPress = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);  // Clear the selection if the same category is clicked
    } else {
      setSelectedCategory(category);  // Set the selected category
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <TextInput
          style={styles.searchBar}
          placeholder="Search Workers"
          value={searchText}
          onChangeText={setSearchText}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.Worker_Role && styles.selectedCategoryButton
              ]}
              onPress={() => handleCategoryPress(category.Worker_Role)}
            >
              <Ionicons name={category.icon} size={24} color={selectedCategory === category.Worker_Role ? "#fff" : "#000"} />
              <Text>{category.Worker_Role}</Text>
          
            </TouchableOpacity>
          ))}
        </ScrollView>
       
      </View>

      {/* Worker Profiles */}
      <FlatList
        data={filteredWorkers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // Adjust based on the design
        renderItem={({ item }) => (
          <View style={styles.profileCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
              <Text style={styles.countryFlag}>{item.countryFlag}</Text>
            </View>
            <Text style={styles.workerName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 16,
    paddingHorizontal: 15,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    marginRight: 15,
    padding: 4,
    backgroundColor: '#ddd',
    borderRadius: 50,
    width: 140,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  selectedCategoryButton: {
    backgroundColor: '#ffa500',
  },
  profileCard: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  countryFlag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 2,
    fontSize: 18,
  },
  workerName: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CategoriesScreen;
