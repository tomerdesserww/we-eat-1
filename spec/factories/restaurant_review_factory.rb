FactoryGirl.define do
  factory :restaurant_review, class: 'Restaurant::Review' do
    restaurant
    reviewer_name { FFaker::Name.name }
    body { FFaker::HipsterIpsum.sentence }
    rating { [*1..5].sample }
  end
end
