<div class="help-container">
	<div class="close"></div>
	<div class="overlay-content"></div>
	<div class="content">
		<h1><%= i18n.__("Keyboard Shortcuts") %></h1>
		<hr>
		<div class="help-outer">
			<table class="keyboard-table">
				<tbody>
					<tr>
						<th></th>
						<th><%= i18n.__("Global shortcuts") %></th>
					</tr>
					<tr>
						<td><span class="key">?</span></td>
						<td><%= i18n.__("Opens this help screen") %></td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<th></th>
						<th><%= i18n.__("Video Player") %></th>
					</tr>
					<tr>
						<td><span class="key">f</span></td>
						<td><%= i18n.__("Toggle Fullscreen") %></td>
					</tr>
					<tr>
						<td><span class="key spacebar"><%= i18n.__("space") %></span></td>
						<td><%= i18n.__("Play/Pause") %></td>
					</tr>
					<tr>
						<td><span class="key arrow">&#8594;</span></td>
						<td><%= i18n.__("Seek Forward") %> 10s</td>
					</tr>
					<tr>
						<td><span class="key shiftleft"><%= i18n.__("shift") %></span>+<span class="key arrow">&#8594;</span></td>
						<td><%= i18n.__("Seek Forward") %> 1 min</td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key arrow">&#8594;</span></td>
						<td><%= i18n.__("Seek Forward") %> 10 mins</td>
					</tr>
					<tr>
						<td><span class="key arrow">&#8593;</span></td>
						<td><%= i18n.__("Increase Volume") %> 10%</td>
					</tr>
					<tr>
						<td><span class="key shiftleft"><%= i18n.__("shift") %></span>+<span class="key arrow">&#8593;</span></td>
						<td><%= i18n.__("Increase Volume") %> 50%</td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key arrow">&#8593;</span></td>
						<td><%= i18n.__("Set Volume to") %> 100%</td>
					</tr>
					<tr>
						<td><span class="key">h</span></td>
						<td><%= i18n.__("Offset Subtitles by") %> +0.1s</td>
					</tr>
					<tr>
						<td><span class="key shiftleft"><%= i18n.__("shift") %></span>+<span class="key">h</span></td>
						<td><%= i18n.__("Offset Subtitles by") %> +1s</td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key">h</span></td>
						<td><%= i18n.__("Offset Subtitles by") %> +5s</td>
					</tr>
					<tr>
						<td><span class="key">m</span></td>
						<td><%= i18n.__("Toggle Mute") %></td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<th></th>
						<th><%= i18n.__("Movie Detail") %></th>
					</tr>
					<tr>
						<td><span class="key">Q</span></td>
						<td><%= i18n.__("Toggle Quality") %></td>
					</tr>
					<tr>
						<td><span class="key enter"><%= i18n.__("enter") %></span>/<span class="key spacebar"><%= i18n.__("space") %></span></td></td>
						<td><%= i18n.__("Play Movie") %></td>
					</tr>
				</tbody>
			</table>
			<table class="keyboard-table last">
				<tbody>
					<tr>
						<th></th>
						<th><%= i18n.__("Global shortcuts") %></th>
					</tr>
					<tr>
						<td><span class="key">?</span></td>
						<td><%= i18n.__("Opens this help screen") %></td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<th></th>
						<th><%= i18n.__("Video Player") %></th>
					</tr>
					<tr>
						<td><span class="key esc"><%= i18n.__("esc") %></span></td>
						<td><%= i18n.__("Exit Fullscreen") %></td>
					</tr>
					<tr>
						<td><span class="key">p</span></td>
						<td><%= i18n.__("Play/Pause") %></td>
					</tr>
					<tr>
						<td><span class="key arrow">&#8592;</span></td>
						<td><%= i18n.__("Seek Backward") %> 10s</td>
					</tr>
					<tr>
						<td><span class="key shiftleft"><%= i18n.__("shift") %></span>+<span class="key arrow">&#8592;</span></td>
						<td><%= i18n.__("Seek Backward") %> 1 min</td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key arrow">&#8592;</span></td>
						<td><%= i18n.__("Seek Backward") %> 10 mins</td>
					</tr>
					<tr>
						<td><span class="key arrow">&#8595;</span></td>
						<td><%= i18n.__("Decrease Volume") %> 10%</td>
					</tr>
					<tr>
						<td><span class="key shiftleft"><%= i18n.__("shift") %></span>+<span class="key arrow">&#8595;</span></td>
						<td><%= i18n.__("Decrease Volume") %> 50%</td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key arrow">&#8595;</span></td>
						<td><%= i18n.__("Set Volume to") %> 0%</td>
					</tr>
					<tr>
						<td><span class="key">g</span></td>
						<td><%= i18n.__("Offset Subtitles by") %> -0.1s</td>
					</tr>
					<tr>
						<td><span class="key shiftleft"><%= i18n.__("shift") %></span>+<span class="key">g</span></td>
						<td><%= i18n.__("Offset Subtitles by") %> -1s</td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key">g</span></td>
						<td><%= i18n.__("Offset Subtitles by") %> -5s</td>
					</tr>
					<tr>
						<td><span class="key">u</span></td>
						<td><%= i18n.__("Show Stream URL") %></td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<th></th>
						<th><%= i18n.__("TV Show Detail") %></th>
					</tr>
					<tr>
						<td><span class="key">Q</span></td>
						<td><%= i18n.__("Toggle Quality") %></td>
					</tr>
					<tr>
						<td><span class="key">W</span></td>
						<td><%= i18n.__("Toggle Watched") %></td>
					</tr>
					<tr>
						<td><span class="key arrow">&#8595;</span></td>
						<td><%= i18n.__("Select Next Epsisode") %></td>
					</tr>
					<tr>
						<td><span class="key arrow">&#8593;</span></td>
						<td><%= i18n.__("Select Previous Episode") %></td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key arrow">&#8595;</span></td>
						<td><%= i18n.__("Select Next Season") %></td>
					</tr>
					<tr>
						<td><span class="key control"><%= i18n.__("ctrl") %></span>+<span class="key arrow">&#8593;</span></td>
						<td><%= i18n.__("Select Previous Season") %></td>
					</tr>
					<tr>
						<td><span class="key enter"><%= i18n.__("enter") %></span>/<span class="key spacebar"><%= i18n.__("space") %></span></td>
						<td><%= i18n.__("Play Episode") %></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>