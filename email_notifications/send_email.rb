require_relative 'bundle/bundler/setup'
require 'iron_worker'
require 'sendgrid-ruby'
include SendGrid

from = Email.new(email: IronWorker.payload["from"])
to = Email.new(email: IronWorker.payload["to"])
subject = IronWorker.payload["subject"]
content = Content.new(type: 'text/plain', value: IronWorker.payload["body"])

mail = Mail.new(from, subject, to, content)
sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
response = sg.client.mail._('send').post(request_body: mail.to_json)
puts response.status_code
puts response.body
puts response.headers
