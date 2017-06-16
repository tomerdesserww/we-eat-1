class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]

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

    if @restaurant.save
      render json: @restaurant, status: :created
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  def update
    if @restaurant.save
      render json: @restaurant, status: :ok
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @restaurant.destroy

    head :no_content
  end

  private
    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end

    def restaurant_params
      params.fetch(:restaurant, {}).permit(:name, :cuisine_id, :address, :rating, :accepts_10bis, :max_delivery_time_minutes)
    end
end
