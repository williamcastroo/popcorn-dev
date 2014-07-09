<ul class="nav nav-hor left">
    <li class="source showMovies"><%= i18n.__("Movies") %></li>
    <li class="source showShows"><%= i18n.__("TV Series") %></li>
</ul>

<ul class="nav nav-hor right">
    <!-- TODO: Add active class -->
    <li><!-- Magnet link -->
        <div class="right magnet">
            <span class="remove-magnet"><span class="text-magnet"></span></span>

            <form><input id="magnetbox" type="text" placeholder='<%= i18n.__("Magnet link") %>'></form>
        </div>
        <!-- -->
    </li>
    <li>
        <button class="favorites active"></button>
    </li>
    <li>
        <button class="about"></button>
    </li>
    <li>
        <button class="settings"></button>
    </li>

</ul>