require 'rails_helper'

RSpec.describe RestaurantsController, type: :controller do
  def serialized_restaurant(restaurant)
    RestaurantSerializer.new(restaurant).as_json.stringify_keys
  end

  describe 'Create' do
    def parameterize_restaurant(restaurant)
      restaurant.as_json.symbolize_keys.slice(:name,
                                              :cuisine_id,
                                              :address,
                                              :accepts_10bis,
                                              :rating,
                                              :max_delivery_time_minutes)

    end

    it 'should create a restaurant with valid parameters' do
      restaurant = build(:restaurant)
      post :create, params: parameterize_restaurant(restaurant)
      expect(response).to have_http_status(:created)
      expect(json).to include(serialized_restaurant(restaurant).except("id"))
      expect(json[:id]).not_to be_nil
    end

    it 'should fail to create a restaurant with missing cuisine' do
      restaurant = build(:restaurant, cuisine_id: nil)
      post :create, params: parameterize_restaurant(restaurant)
      expect(response).to have_http_status(:bad_request)
      expect(json[:errors]).to eq ["Cuisine must exist"]
    end
  end

  describe 'Fetch' do
    it 'should return all existing restaurants' do
      restaurants = create_list(:restaurant, 1)
      get :index
      serialized_restaurants = restaurants.map{ |r| serialized_restaurant(r) }
      expect(json).to match_array(serialized_restaurants)
    end

    it 'should return empty array when there are no restaurants' do
      get :index
      expect(json).to eq([])
    end

    it 'should return an existing restaurant' do
      restaurant = create(:restaurant)
      get :show, params: { id: restaurant.id }
      expect(response).to have_http_status(:ok)
      expect(json).to include(serialized_restaurant(restaurant))
    end

    it 'should fail to return a non-existing restaurant' do
      get :show, params: { id: -1 }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'Update' do
    it 'should update an existing restaurant with valid parameters' do
      restaurant = create(:restaurant)
      put :update, params: { id: restaurant.id, name: 'New Name'}
      expect(response).to have_http_status(:ok)
      expect(json[:name]).to eq 'New Name'
    end

    it 'should fail to update a restaurant with invalid parameters' do
      restaurant = create(:restaurant)
      put :update, params: { id: restaurant.id, name: nil }
      expect(response).to have_http_status(:bad_request)
    end

    it 'should fail to update a non-existing restaurant' do
      put :update, params: { id: -1, name: 'New Name'}
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'Deletes' do
    it 'should delete an existing restaurant' do
      restaurant = create(:restaurant)
      delete :destroy, params: { id: restaurant.id }
      expect(response).to have_http_status(:ok)
    end

    it 'deletes only the specified restaurant' do
      restaurant1, restaurant2 = create_list(:restaurant, 2)
      delete :destroy, params: { id: restaurant1.id }
      expect(Restaurant.find(restaurant2.id)).not_to be_nil
    end

    it 'should fail to delete a non-existing restaurant' do
      delete :destroy, params: { id: -1 }
      expect(response).to have_http_status(:not_found)
    end
  end
end
