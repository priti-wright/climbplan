import {connect} from 'react-redux';
import {TripReportResults} from '../components/TripReportResults';


const mapStateToProps = state => {
    return {
        place: state.place,
        tripReports: state.tripReports.items,
        isFetching: state.tripReports.isFetching,
    };
};

const TripReportsContainer = connect(
  mapStateToProps
)(TripReportResults);

export default TripReportsContainer;
