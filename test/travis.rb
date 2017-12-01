#!/usr/bin/env ruby
result = `sass sass/main.scss css/style.css`
raise result unless $?.to_i == 0
raise "When compiled the module should output some CSS" unless File.exists?('css/style.css')
puts "Regular compile worked successfully"
