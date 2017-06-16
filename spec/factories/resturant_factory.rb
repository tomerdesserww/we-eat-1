FactoryGirl.define do
  factory :restaurant do
    name 'Hakosem'
    cuisine
    rating 1
    address "1 Ibn Gavirol St., Tel-Aviv"
    accepts_10bis false
    max_delivery_time_minutes 10
  end
end
