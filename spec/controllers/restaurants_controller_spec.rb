require 'rails_helper'

RSpec.describe RestaurantsController, type: :controller do
  def serialized_restaurant(restaurant)
    RestaurantSerializer.new(restaurant).as_json.stringify_keys
  end

  describe 'Create a restaurant' do
    def create(restaurant)
      get :create, params: {
        restaurant: restaurant.as_json.symbolize_keys.slice(:name,
                                                            :cuisine_id,
                                                            :address,
                                                            :accepts_10bis,
                                                            :rating,
                                                            :max_delivery_time_minutes)
      }
    end

    it 'should create a restaurant with valid parameters' do
      restaurant = build(:restaurant)
      create(restaurant)
      expect(response).to have_http_status(:created)
      expect(json).to include(serialized_restaurant(restaurant))
    end

    it 'should fail to create a restaurant with missing cuisine' do
      restaurant = build(:restaurant, cuisine_id: nil)
      create(restaurant)
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json[:cuisine]).to eq ["must exist"]
    end
  end

  describe 'Fetch a restaurant' do
    it 'should return all existing restaurants' do
      restaurants = create_list(:restaurant, 1)
      get :index
      serialized_restaurants = restaurants.map{ |r| serialized_restaurant(r) }
      expect(json).to match_array(serialized_restaurants)
    end
  end

  describe 'Fetch a specific restaurant' do
    subject { create(:restaurant) }

    it 'should return an existing restaurant' do
      get :show, params: { id: subject.id }
      expect(response).to have_http_status(:ok)
      expect(json[:name]).to eq subject.name
    end

    it 'should fail to return a non-existing restaurant' do
      expect { raise get :show, params: { id: -1 } }.to raise_error
    end
  end
end
