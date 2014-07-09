<%  
if(typeof backdrop === "undefined"){ backdrop = ""; }; 
if(typeof synopsis === "undefined"){ synopsis = "Synopsis not available."; }; 
if(typeof runtime === "undefined"){ runtime = "N/A"; }; 
%>

    <div data-bgr="<%= backdrop %>" class="backdrop"></div>
    <div class="backdrop-overlay"></div>

<div class="close"></div>


    <div class="container">
        <img src="images/cover-placeholder.jpg" data-cover="<%= image %>" class="mcover-image" />
        <div class="title"><%= title %></div>


        <div class="meta-container">

            <div class="item"><%= year %></div>
            <div class="dot"></div>
            <div class="item"><%= runtime %> min</div>
            <div class="dot"></div>
            <div data-toggle="tooltip" data-placement="top" title="<%=i18n.__("Open IMDb page") %>" class="movie-imdb-link"></div>
            <div class="dot"></div>
            <div data-toggle="tooltip" data-placement="right" title="<%= rating %>/10" class="star-container">
<% var p_rating = Math.round(rating) / 2; %>
               <% for (var i = 1; i <= Math.floor(p_rating); i++) { %>
                        <i class="fa fa-star star"></i>
                    <% }; %>
                    <% if (p_rating % 1 > 0) { %>
                        <i class="fa fa-star-half star"></i>
                    <% }; %>
                    <% for (var i = Math.ceil(p_rating); i < 5; i++) { %>
                        <i class="fa fa-star star-empty"></i>
                <% }; %>

            </div>
            <div data-toggle="tooltip" data-placement="left" title="Health <%= health %>" class="health-icon <%= health %>"></div>

        </div>

        <div class="overview"><%= synopsis %></div>

        <div class="bottom-container">
            <div class="favourites-toggle"><%=i18n.__("Add to bookmarks") %></div>
            <div id="watch-now" class="button"><%=i18n.__("Watch Now") %></div>
            <div id="watch-trailer" class="button"><%=i18n.__("Watch Trailer") %></div>

            <div class="movie-quality-container">

               <% if (torrents["720p"] !== undefined && torrents["1080p"] !== undefined) { %>
                            <div class="q720">720p</div>
                            <div class="q1080">1080p</div>
                            <div class="quality switch white">
                                <input type="radio" name="switch" id="switch-hd-off" >
                                <input type="radio" name="switch" id="switch-hd-on" checked >
                                <span class="toggle"></span>
                            </div>
                        <% } else { %>
                            <div class="q720"><% if (torrents["720p"] !== undefined) { %>720p<% }else if (torrents["1080p"] !== undefined) { %>1080p<% } else { %>HDRip<% } %> </div>
                        <% } %>

            </div>


                       <div class="flag-container">
                      <% for(var lang in subtitle){ %>
                          <div class="sub-flag-icon flag <%= lang %>" data-lang="<%= lang %>" title="<%= App.Localization.langcodes[lang].nativeName %>"></div>
                       <% } %>
                    </div>




        </div>


    </div>


