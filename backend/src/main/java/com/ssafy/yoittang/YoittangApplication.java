package com.ssafy.yoittang;

import java.io.InputStream;
import java.util.jar.Attributes;
import java.util.jar.Manifest;

import jakarta.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class YoittangApplication {

	public static void main(String[] args) {
		SpringApplication.run(YoittangApplication.class, args);
	}

	@PostConstruct
	public void logGitCommitHash() {
		try (InputStream manifestStream = getClass().getClassLoader().getResourceAsStream("META-INF/MANIFEST.MF")) {
			if (manifestStream != null) {
				Manifest manifest = new Manifest(manifestStream);
				Attributes attr = manifest.getMainAttributes();
				String version = attr.getValue("Implementation-Version");
				String buildTime = attr.getValue("Built-Time");
				System.out.println("🛠️ Build Info - Git: " + version + ", Time: " + buildTime);
			}
		} catch (Exception e) {
			System.err.println("⚠️ Could not read build info: " + e.getMessage());
		}
	}
}
