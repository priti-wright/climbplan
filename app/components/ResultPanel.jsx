import React from 'react';
import _ from 'lodash';

import SearchedPlaceStore from '../store/SearchedPlaceStore'
import {trackOutboundLink} from '../ga.js'

var placeProp = {place: React.PropTypes.object.isRequired};

var TargetSummary = React.createClass({
    propTypes: placeProp,
    render(){
        var place = this.props.place
        var lat = place.geometry.location.A;
        var lon = place.geometry.location.F;
        return <div>
            Target: <strong>{place.name}</strong>, <i>{place.types[0].replace('_', ' ')} </i> 
            located at ({lat}, {lon})
        </div>
    }
})

var ResearchLink = React.createClass({
    propTypes: {
        siteName: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
    },
    render(){
        function onClick(){
            trackOutboundLink(this); return true;
        }
        return <a 
                href={this.props.url}
                onClick={onClick}
                target="_blank"
                className="site"
            >
            {this.props.siteName}
        </a>
    }
})

var ResearchSuggestions = React.createClass({
    propTypes: placeProp,
    render(){
        var place = this.props.place;

        var links = [
          {
            site: 'Peakbagger (by name)',
            url: `http://www.peakbagger.com/search.aspx?tid=M&ss=${place.nameUrlEncoded}&lat=${place.latShort}&lon=${place.lonShort}`
          },
          {
            site: 'Peakbagger (by lat/lon)',
            url: `http://www.peakbagger.com/search.aspx?tid=R&ss=${place.nameUrlEncoded}&lat=${place.latShort}&lon=${place.lonShort}`
          },
          {
            site: 'SummitPost',
            url: `http://www.summitpost.org/object_list.php?object_type=1&object_name_1=${place.namePlussed}`
          },
          {
            site: 'WTA',
            url: `http://www.wta.org/go-hiking/trip-reports/tripreport_search?title=${place.namePlussed}`
          },
          {
            site: 'Weather.gov',
            url: `http://forecast.weather.gov/MapClick.php?lon=${place.lon}&lat=${place.lat}`
          },
          {
            site: 'Mountain-Forecast',
            url: `http://www.mountain-forecast.com/peaks/${place.nameHypenated}`
          },
          {
            site: 'CalTopo',
            url: `http://caltopo.com/map.html#ll=${place.lat},${place.lon}&z=14&b=t`
          },
          {
            site: 'Cascade Climbers',
            url: `http://cascadeclimbers.com/forum/ubbthreads.php/ubb/tripreportsbeta`,
            integrated: false
          },
        ];

        return <div className="research-suggestions">
        {_.map(
            links,
            function(link){
                return <ResearchLink siteName={link.site} url={link.url} key={link.site + link.url}/>;
            }
        )}
        </div>
    }
})

var FeedbackMessage = React.createClass({
    render(){
        return <p>
        Thanks for playing! 
        Drop me some <a href="https://docs.google.com/document/d/1s91RrNYWmucPVacHv7GkcTUHQmXTvpcIk0xGPHxJZ3A/edit?usp=sharing" target="_new">feedback</a>!
        </p>
    }
})

var ResultPanel = React.createClass({
    propTypes: {
        place: React.PropTypes.object.isRequired
    },
    render () {
        return _.isUndefined(this.props.place)?
        <div></div> : <div>
            <TargetSummary place={this.props.place} />
            <h1 className="research-title">Research</h1>
            <ResearchSuggestions place={this.props.place} />
            <FeedbackMessage/>
        </div>
    }
});

export default ResultPanel;