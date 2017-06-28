# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Cuisine.create!(name: "Italian", symbol: '&#102;')
Cuisine.create!(name: "American", symbol: '&#65;')
Cuisine.create!(name: "Israeli", symbol: '&#63;')
Cuisine.create!(name: "French", symbol: '&#67;')
Cuisine.create!(name: "Asian", symbol: '&#105;')

Restaurant.create!(name: "Piazza", cuisine_id: 1, rating: 5, accepts_10bis: false, address: "Dizengoff St 99, Tel Aviv-Yafo", lat: 32.07939,lng: 34.773793, max_delivery_time_minutes: 60)
Restaurant.create!(name: "Moses", cuisine_id: 2, rating: 3, accepts_10bis: false, address: "Rothschild Blvd 35, Tel Aviv-Yafo", lat: 32.0638841, lng: 34.7735413, max_delivery_time_minutes: 60)
Restaurant.create!(name: "River Noodles Bar", cuisine_id: 5, rating: 2, accepts_10bis: true, address: "Ibn Gabirol St 30, Tel Aviv-Yafo", lat: 32.0750419, lng: 34.7819586, max_delivery_time_minutes: 5)
Restaurant.create!(name: "Giraffe", cuisine_id: 5, rating: 4, accepts_10bis: true, address: "Ibn Gabirol St 49, Tel Aviv-Yafo", lat: 32.0770685, lng: 34.7812074, max_delivery_time_minutes: 45)
Restaurant.create!(name: "Ha'Achim", cuisine_id: 3, rating: 4, accepts_10bis: false, address: "Ibn Gabirol St 12, Tel Aviv-Yafo", lat: 32.0725828, lng: 34.7820083, max_delivery_time_minutes: 45)
Restaurant.create!(name: "Brasserie M&R", cuisine_id: 4, rating: 5, accepts_10bis: true, address: "Ibn Gabirol St 70, Tel Aviv-Yafo", lat: 32.0805573, lng: 34.7814779, max_delivery_time_minutes: 90)
Restaurant.create!(name: "Ha'Kosem", cuisine_id: 3, rating: 4, accepts_10bis: false, address: "Shlomo ha-Melekh St 1, Tel Aviv-Yafo", lat: 32.0764057, lng: 34.7767122, max_delivery_time_minutes: 15)
Restaurant.create!(name: "The Diner by Goocha", cuisine_id: 2, rating: 3, accepts_10bis: true, address: "Ibn Gabirol St 14, Tel Aviv-Yafo", lat: 32.0727575, lng: 34.7819543, max_delivery_time_minutes: 25)
Restaurant.create!(name: "Joya", cuisine_id: 1, rating: 4, accepts_10bis: true, address: "HaArba'a St 5, Tel Aviv-Yafo", lat: 32.0703954, lng: 34.7834662, max_delivery_time_minutes: 60)