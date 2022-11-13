# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#index'

  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'

  resources 'users'
  resources 'transactions'
end
