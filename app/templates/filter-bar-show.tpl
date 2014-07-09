<ul class="nav nav-hor left">
	<li class="source showMovies"><%= i18n.__("Movies") %></li>
	<li class="source active showShows"><%= i18n.__("TV Series") %></li>
</ul>

<ul id="nav-filters" class="nav nav-hor filters">
	<li class="dropdown filter genres">
		<a class="dropdown-toggle" data-toggle="dropdown" href="#">
			<%= i18n.__("Genre") %><span class="value"><%= i18n.__(genre) %></span>
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu">
			<% _.each(genres, function(c) { %>
			<li><a href="#" data-value="<%= c %>"><%= i18n.__(c) %></a></li>
			<% }); %>
		</ul>
	</li>
	<li class="dropdown filter sorters">
		<a class="dropdown-toggle" data-toggle="dropdown" href="#">
			<%= i18n.__("Sort by") %><span class="value"><%= i18n.__((sorter.capitalizeEach())) %></span>
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu">
			<% _.each(sorters, function(c) { %>
			<li><a href="#" data-value="<%= c %>"><%= i18n.__((c.capitalizeEach())) %></a></li>
			<% }); %>
		</ul>
	</li>
</ul>
<ul class="nav nav-hor right">
	<li>
		<div class="right search">
			<span class="remove-search"><span class="text-search"></span></span>
			<form><input id="searchbox" type="text" placeholder="<%= i18n.__("Search") %>"></form>
		</div>
        <!-- Magnet link -->
		<div class="right magnet">
			<span class="remove-magnet"><span class="text-magnet"></span></span>
			<form><input id="magnetbox" type="text" placeholder='<%= i18n.__("Magnet link") %>'></form>
		</div>
        <!-- -->
	</li>
	<!--<li><button class="triggerUpdate"></button></li>-->
	<li><i class="fa fa-heart favorites"></i></li>
	<li><i class="fa fa-info-circle about"></i></li>
	<li><i class="fa fa-cog settings"></i></li>
</ul>
