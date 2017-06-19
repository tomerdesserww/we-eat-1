class RestaurantsController < ApplicationController
  def index
    render json: Restaurant.all
  end

  def show
    render json: current_restaurant
  end

  def create
    render json: Restaurant.create!(restaurant_params), status: :created
  end

  def update
    @restaurant = current_restaurant
    @restaurant.update!(restaurant_params)

    render json: @restaurant, status: :ok
  end

  def destroy
    @restaurant = current_restaurant
    @restaurant.destroy!

    head :ok
  end

  private

  def current_restaurant
    Restaurant.find(params.require(:id))
  end

  def restaurant_params
    params.permit(:name, :cuisine_id, :address, :rating, :accepts_10bis, :max_delivery_time_minutes)
  end
end
