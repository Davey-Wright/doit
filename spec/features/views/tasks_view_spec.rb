require 'rails_helper'

RSpec.describe 'tasks/index', type: :feature do
	it 'Should display all the tasks in the database' do
		task1 = FactoryBot.create(:task)
		task2 = FactoryBot.create(:task)
		visit tasks_path
		response_value = ActiveSupport::JSON.decode(page.body)
		task_title = response_value.first['title']
		expect(page).to have_content(task_title)
	end
end