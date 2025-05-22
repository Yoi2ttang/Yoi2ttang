package com.ssafy.yoittang;

import java.io.InputStream;
import java.util.jar.Attributes;
import java.util.jar.Manifest;

import jakarta.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class YoittangApplication {

	public static void main(String[] args) {
		SpringApplication.run(YoittangApplication.class, args);
	}

	@PostConstruct
	public void logGitCommitHash() {
		Logger log = LoggerFactory.getLogger(getClass());
		try (InputStream manifestStream = getClass().getClassLoader().getResourceAsStream("META-INF/MANIFEST.MF")) {
			if (manifestStream != null) {
				Manifest manifest = new Manifest(manifestStream);
				Attributes attr = manifest.getMainAttributes();
				String version = attr.getValue("Implementation-Version");
				String buildTime = attr.getValue("Built-Time");
				log.info("🛠️ Build Info - Git: {}, Time: {}", version, buildTime);
			}
		} catch (Exception e) {
			log.warn("⚠️ Could not read build info: {}", e.getMessage());
		}
	}
}
