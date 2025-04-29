FROM openjdk:17-jdk

COPY backend/build/libs/yoittang-0.0.1-SNAPSHOT.jar app.jar

WORKDIR /app

ENTRYPOINT ["java", "-jar", "/app.jar"]

EXPOSE 8080
