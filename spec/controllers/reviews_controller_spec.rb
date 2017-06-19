require 'rails_helper'

RSpec.describe ReviewsController, type: :controller do
  def serialized_review(review)
    ReviewSerializer.new(review).as_json.stringify_keys
  end

  describe 'Create' do
    def parameterize_review(review)
      review.as_json.symbolize_keys.slice(:restaurant_id, :reviewer_name, :body, :rating)
    end

    it 'should create a review with valid parameters' do
      restaurant = create(:restaurant)
      review = build(:restaurant_review, restaurant: restaurant)
      post :create, params: parameterize_review(review)
      expect(response).to have_http_status(:created)
      expect(json).to include(serialized_review(review).except("id"))
      expect(json[:id]).not_to be_nil
    end

    it 'should fail to create a review for non-existing restaurant' do
      review = build(:restaurant_review, restaurant_id: -1)
      post :create, params: parameterize_review(review)
      expect(response).to have_http_status(:bad_request)
      expect(Restaurant::Review.count).to eq(0)
    end
  end
end
