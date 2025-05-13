package com.ssafy.yoittang.term.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.yoittang.term.application.TermService;
import com.ssafy.yoittang.term.domain.response.TermDetailGetResponse;
import com.ssafy.yoittang.term.domain.response.TermSummaryGetResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("terms")
public class TermController {

    private final TermService termService;

    @GetMapping
    public ResponseEntity<List<TermSummaryGetResponse>> getTermSummary() {
        return ResponseEntity.ok(termService.getTermSummary());
    }

    @GetMapping("/{termId}")
    public ResponseEntity<TermDetailGetResponse> getTermDetailsByTermId(@PathVariable(name = "termId") Long termId
    ) {
        return ResponseEntity.ok(termService.getTermDetailsByTermId(termId));
    }
}
