import React from 'react';
import _ from 'lodash';

import SearchedPlaceStore from '../store/SearchedPlaceStore'
import {trackOutboundLink} from '../ga'
import get_peakbagger_link from '../sites/peakbagger'


var placeProp = {place: React.PropTypes.object.isRequired};

var TargetSummary = React.createClass({
    propTypes: placeProp,
    render(){
        var place = this.props.place
        return <div>
            Target: <strong>{place.name}</strong>, <i>{place.types[0].replace('_', ' ')} </i> 
            located at ({place.lat}, {place.lon})
        </div>
    }
})

var ResearchLink = React.createClass({
    propTypes: {
        siteName: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
    },
    render(){
        const onClick = () => trackOutboundLink(this.props.url);
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
            site: 'Peakbagger',
            url: get_peakbagger_link(place)
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