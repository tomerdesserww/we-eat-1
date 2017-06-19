require 'rails_helper'

RSpec.describe Restaurant, type: :model do
  describe 'Reviews' do
    subject { create(:restaurant) }
    it 'should calculate the average rating' do
      create_list(:restaurant_review, 5, restaurant: subject)
      average_rating = subject.reviews.average(:rating)

      expect(Restaurant.find(subject.id).rating).to eq(average_rating)
    end
  end
end
