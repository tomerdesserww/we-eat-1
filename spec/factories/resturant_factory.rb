FactoryGirl.define do
  factory :restaurant do
    name { %w(Hakosem Moses River Ha\'Achim Giraffe).sample }
    cuisine
    rating 0
    address { FFaker::Address.street_address }
    accepts_10bis { FFaker::Boolean.random }
    max_delivery_time_minutes { [*1..120].sample }
  end
end
