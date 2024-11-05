# Shai

- Booking is going to be an issue since Workiz does not have a way to check the schedule using the API. The closest thing we have is Team/Off which has the hours the team member is on the clock, not sufficient.

- The workaround here is to use the Schedule / Booking form provided by Workiz. We can interface this with the website so that when the user decides to book the service, they click schedule (or some other CTA button) and the page routes to the Workiz scheduler.
    
    - The downside with this approach is the UX is lessened due to having to reinput the same data, although there might be a way to inject said data into the form using URL parameters (I have not tested this yet though)
    
    - Another potential issue could arise when injecting the quote app into the website, depending on how some interactions take place (For example, the privacy modal does not function properly ATM)
