require 'rails_helper'

RSpec.describe TasksController, type: :controller do
	describe 'tasks#index' do
		it 'Should list all the tasks from the database' do
			task1 = FactoryBot.create(:task)
			task2 = FactoryBot.create(:task)
			task1.update_attributes(title: 'Something else')
			get :index
			expect(response).to have_http_status(:success)
			response_value = ActiveSupport::JSON.decode(response.body)
			expect(response_value.count).to eq(2)
			response_ids = response_value.collect do |task|
				task['id']
			end
			expect(response_ids).to eq([task1.id, task2.id])
		end
	end

	describe 'tasks#update' do
		it 'Should allow tasks to be marked as done' do
			task = FactoryBot.create(:task)
			put :update, params: { id: task.id, task: { done: true } }
			expect(response).to have_http_status(:success)
			task.reload
			expect(task.done).to eq(true)
		end
	end

	describe 'tasks#create' do
		it 'Should allow new task to be created' do
			post :create, params: { task: {title: 'shaka'} }
			expect(response).to have_http_status(:success)
			response_value = ActiveSupport::JSON.decode(response.body)
			expect(response_value['title']).to eq('shaka')
			expect(Task.last.title).to eq('shaka')
		end
	end

end
