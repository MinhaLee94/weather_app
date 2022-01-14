import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import * as Location from "expo-location";


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "645400e286c4b5461cb4bbd29b7478bc";

const App = () => {
	const [city, setCity] = useState("Loading...");
	const [days, setDays] = useState([]);
	const [locationPermission, setLocationPermission] = useState(true);

	const getWeather = async() => {
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
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`)
			.then((response) => response.json())
			.then((json) => setDays(json.daily));
	};

	useEffect(() => {
		getWeather();
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
				{days.length === 0 ? (
					<View style={styles.day}>
						<ActivityIndicator color="white" size="large" />
					</View>
				) : (
					days.map((day, index) => 
						<View key={index} style={styles.day}>
							<Text style={styles.temp}>
								{parseFloat(day.temp.day).toFixed(1)}
							</Text>
							<Text style={styles.description}>{day.weather[0].main}</Text>
							<Text style={styles.tinyText}>{day.weather[0].description}</Text>
						</View>
					)
				)}
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
	tinyText: {
		fontSize: 20,
	},
});

export default App;