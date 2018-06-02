require 'rails_helper'

RSpec.describe 'tasks/index', type: :feature do
	it 'Should display all the tasks in the database' do
		task1 = FactoryBot.create(:task)
		task2 = FactoryBot.create(:task)
		visit tasks_path
		response_value = ActiveSupport::JSON.decode(page.body)
		expect(response_value.count).to eq(2)
	end
end
