class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all

    render json: @restaurants
  end

  def show
    @restaurant = Restaurant.find(params.require(:id))

    render json: @restaurant
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)

    @restaurant.save!
    render json: @restaurant, status: :created
  end

  def update
    @restaurant = Restaurant.find(params.require(:id))

    @restaurant.update!(restaurant_params)
    render json: @restaurant, status: :ok
  end

  def destroy
    @restaurant = Restaurant.find(params.require(:id))
    @restaurant.destroy!

    head :ok
  end

  private

  def restaurant_params
    params.permit(:name, :cuisine_id, :address, :rating, :accepts_10bis, :max_delivery_time_minutes)
  end
end
