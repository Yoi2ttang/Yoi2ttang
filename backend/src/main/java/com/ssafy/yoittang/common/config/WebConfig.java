package com.ssafy.yoittang.common.config;

import com.ssafy.yoittang.common.interceptor.QueryLoggingInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

	private final QueryLoggingInterceptor queryLoggingInterceptor;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOriginPatterns("*")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
			.allowedHeaders("*")
			.allowCredentials(true);
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(queryLoggingInterceptor)
			.excludePathPatterns(
				"/css/**",
				"/images/**",
				"/js/**",
				"/swagger-resources/**",
				"/swagger-ui/**",
				"/v3/api-docs/**",
				"/webjars/**"
			);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**")
			.addResourceLocations("classpath:/static/");
	}
}
