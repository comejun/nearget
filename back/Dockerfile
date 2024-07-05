FROM openjdk:17-jdk-slim
LABEL maintainer="test@test.com"
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=./build/libs/back.jar
COPY ${JAR_FILE} {back}.jar
ENTRYPOINT ["java","-jar","/{back}.jar"]