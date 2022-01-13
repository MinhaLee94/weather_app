import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const App = () => {
	const [location, setLocation] = useState();
	const [locationPermission, setLocationPermission] = useState(true);
	const [city, setCity] = useState("Loading...");
	const askPermission = async() => {
		const { granted } = await Location.requestForegroundPermissionsAsync();
		if (!granted) {
			setLocationPermission(false);
		}

		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync({ accuracy: 5 });

		const location = await Location.reverseGeocodeAsync(
			{ latitude, longitude },
			{ useGoogleMaps: false }
		);

		setCity(location[0].city);
	};

	useEffect(() => {
		askPermission();
	}, []);

    return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>{city}</Text>
			</View>
			<ScrollView
				pagingEnabled
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.weather}
			>
				<View style={styles.day}>
				<Text style={styles.temp}>27</Text>
				<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
				<Text style={styles.temp}>27</Text>
				<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
				<Text style={styles.temp}>27</Text>
				<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
				<Text style={styles.temp}>27</Text>
				<Text style={styles.description}>Sunny</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "tomato",
	},
	city: {
	  flex: 1.2,
	  justifyContent: "center",
	  alignItems: "center",
	},
	cityName: {
	  fontSize: 58,
	  fontWeight: "500",
	},
	weather: {},
	day: {
	  width: SCREEN_WIDTH,
	  alignItems: "center",
	},
	temp: {
	  marginTop: 50,
	  fontWeight: "600",
	  fontSize: 178,
	},
	description: {
	  marginTop: -30,
	  fontSize: 60,
	},
});

export default App;