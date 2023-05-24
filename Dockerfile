# Open []
# Lord Atakora 

FROM node:14.15.4 as node 

RUN chmod +x deployment-service
RUN mkdir -p /app
WORKDIR /app
COPY . .
#RUN npm install 
#RUN alias ng="node_modules/@angular/cli/bin/ng.js"
#CMD ["ng serve --host 0.0.0.0 --disable-host-check"] 
#EXPOSE 8080