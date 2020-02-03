export class Helpers {
    constructor() {}

   public extractTiming = (timing, ...dataNames) => {
        const navigationStart =  timing.navigationStart;
      
        const extractedData = {};
        dataNames.forEach(name => {
          extractedData[name] = timing[name] - navigationStart;
        });
      
        return extractedData;
      };

  

    
public  getTimeFromPerformanceMetrics = (metrics, name) =>
  metrics.metrics.find(x => x.name === name).value * 1000;

  public extractDataFromPerformanceMetrics = (metrics, ...dataNames) => {
  const navigationStart = this.getTimeFromPerformanceMetrics(
    metrics,
    'NavigationStart'
  );

  const extractedData = {};
  dataNames.forEach(name => {
    extractedData[name] =
      this.getTimeFromPerformanceMetrics(metrics, name) - navigationStart;
  });

  return  extractedData;
};


public convertMiliseconds(miliseconds: number) {
  let days: number, hours: number, minutes: number , seconds: number, total_hours: number, total_minutes: number, total_seconds: number;
  
  
  total_seconds = Math.floor(miliseconds / 1000);
  total_minutes = Math.floor(total_seconds / 60);
  total_hours = Math.floor(total_minutes / 60);
  days =   Math.floor(total_hours / 24);

  seconds = total_seconds % 60;
  minutes = total_minutes % 60;
  hours = total_hours % 24;
  
  switch('s') {
	case 's':
		return total_seconds;
	default:
		return { d: days, h: hours, m: minutes, s: seconds };
  }
};
      


convertResultsToSeconds(object: Object){
  for (let key in object) {
    object[key] =  `${this.convertMiliseconds(object[key])} seconds`
  }
}




}